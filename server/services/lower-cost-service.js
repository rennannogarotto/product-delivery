//=============================================================================
// GRAPH SERVICE
//=============================================================================
'use strict';
var LowerCostService = {};

LowerCostService.getLowerCost = function(routes, source, dest, autonomy, pricePerLiter, callback) {

	if (!routes || routes.length < 1 || !source || !dest || !autonomy || !pricePerLiter) {
		callback({
			"message": "You must inform valid values to execute this method."
		});
		return;
	}

	var inf = Number.POSITIVE_INFINITY;
	var distance = {};
	var done = {};
	var pred = {};
	for (var i in routes) {
		// Unknown distance function from source to i.
		distance[i] = inf;
		pred[i] = 0;
		done[i] = false;
	}

	// Distance from source to source = 0
	distance[source] = 0;

	for (i in routes) {
		var minDist = inf,
			closest;
		for (var j in routes) {
			if (!done[j]) {
				if (distance[j] <= minDist) {
					minDist = distance[j];
					closest = j;
				}
			}
		}
		done[closest] = true;
		if (closest === dest) {
			break;
		}

		var neighbors;
		if (routes[closest] === undefined) {
			callback({
				"message": "Point ' + place + ' not found found"
			});
			return;
		} else {
			neighbors = routes[closest];
		}

		for (var nb in neighbors) {
			var w = neighbors[nb];
			if (!done[nb]) {
				if (distance[closest] + w < distance[nb]) {
					distance[nb] = Number(distance[closest]) + Number(w);
					pred[nb] = closest;
				}
			}
		}
	}

	// Done, now print.
	i = dest;
	if (distance[i] < inf) {
		var thePath = i;
		var place = i;
		while (place !== source) {
			place = pred[place];
			if (place !== source) {
				thePath = place + '->' + thePath;
			}
		}
		thePath = place + '->' + thePath;
		callback(null, getResponse(source, dest, distance[i], thePath, autonomy, pricePerLiter));
		return;
	} else {
		callback(null, {
			"message": "Impossible verify the cost."
		});
		return;
	}
};

LowerCostService.buildRoutes = function(routesFromDB, callback) {
	var routes = {};
	if (routesFromDB && routesFromDB.length > 0) {
		var parsed = JSON.parse(JSON.stringify(routesFromDB));

		for (var x in parsed) {

			if (!(parsed[x].origin in routes)) {
				routes[parsed[x].origin] = {};
			}
			routes[parsed[x].origin][parsed[x].destination] = parsed[x].distance;


			if (!(parsed[x].destination in routes)) {
				routes[parsed[x].destination] = {};
			}
			routes[parsed[x].destination][parsed[x].origin] = parsed[x].distance;

		}
		callback(null, routes);
	} else {
		callback('Error');
	}
};

module.exports = LowerCostService;

function getResponse(source, dest, distance, path, autonomy, pricePerLiter) {

	var pricePerKm = pricePerLiter / autonomy;
	var totalCost = distance * pricePerKm;

	return {
		"origin": source,
		"destination": dest,
		"distance": distance,
		"path": path,
		"cost": totalCost.toFixed(2)
	};
}