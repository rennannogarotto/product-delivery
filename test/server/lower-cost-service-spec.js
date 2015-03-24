//=============================================================================
// SPEC FOR  LOWER COST SERVICE
//=============================================================================
var LowerCostService = require('../../server/services/lower-cost-service');

describe("Build Routes tests", function() {
	it("should not return valid routes. No routes.", function() {
		LowerCostService.buildRoutes(null, function(err, routes) {
			expect(routes).toBe(undefined);
			expect(err).toEqual('Error');
		});
	});

	it("should not return valid routes. Empty array.", function() {
		LowerCostService.buildRoutes([], function(err, routes) {
			expect(routes).toBe(undefined);
			expect(err).toEqual('Error');
		});
	});

	it("should return valid routes", function() {


		var routesFromDB = [{
			origin: 'A',
			destination: 'B',
			distance: 10
		}, {
			origin: 'B',
			destination: 'C',
			distance: 10
		}];

		var expectedRoutes = {
			A: {
				B: 10
			},
			B: {
				A: 10,
				C: 10
			},
			C: {
				B: 10
			}
		};

		LowerCostService.buildRoutes(routesFromDB, function(err, routes) {
			expect(routes.toString()).toEqual(expectedRoutes.toString());
			expect(err).toEqual(undefined);
		});
	});
});

//LowerCostService.getLowerCost = function(routes, source, dest, autonomy, pricePerLiter, callback) {


describe("Lower Cost tests", function() {
	it("should not return valid cost. No values.", function() {
		LowerCostService.getLowerCost(null, null, null, null, null, function(err, totalCost) {
			expect(totalCost).toBe(undefined);
			expect(err).toEqual({
				"message": "You must inform valid values to execute this method."
			});
		});
	});

	it("should return valid cost.", function() {
		var routes = {
			A: {
				B: 10
			},
			B: {
				A: 10,
				C: 10
			},
			C: {
				B: 10
			}
		};

		var expectedTotalCost = { origin : 'A', destination : 'C', distance : 20, path : 'A->B->C', cost : '5.00' };

		LowerCostService.getLowerCost(routes, 'A', 'C', '10', 2.50, function(err, totalCost) {			
			expect(totalCost.cost).toEqual(expectedTotalCost.cost);
			expect(totalCost.path).toEqual(expectedTotalCost.path);
			expect(err).toEqual(undefined);
		});
	});
});