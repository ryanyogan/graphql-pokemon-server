/* global beforeAll afterAll afterEach */
const db = require('../db');
const { runQuery } = require('../run');
const pokemonResolvers = require('../../src/api/pokemon/pokemon.resolvers');

// tests are executed using Jest :~)

describe('Project', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('pokemons', () => {
      test('should resolve correctly', async () => {
        await db.models.project.create([
          {
            name: 'Test 1',
          },
          {
            name: 'Test 2',
          },
        ]);

        const results = await pokemonResolvers.Query.pokemons(
          null,
          { input: {} },
          {
            models: {
              pokemon: db.models.pokemon,
            },
          },
        );

        expect(results).toHaveLength(2);
      });

      test('should have correct query', async () => {
        await db.models.pokemon.create([
          {
            name: 'Test 1',
          },
          {
            name: 'Test 2',
          },
        ]);

        const query = `
        `;

        const results = await runQuery(query);
        expect(results.errors).toBeUndefined();
        expect(results.data.projects).toHaveLength(2);
      });
    });
  });
});
