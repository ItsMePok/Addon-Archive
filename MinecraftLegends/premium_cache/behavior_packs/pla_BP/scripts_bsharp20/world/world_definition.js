
const pokeWorldGenDefinition = {
    base: null,
    modify: (filterManager) => {
        filterManager.AppendFilter(['center', 'poke'], 1)
        filterManager.AppendFilter(['set1', 'poke'], 1)
    }
};

SNIPPET_InheritsFromGameMode('poke', () => {
    SetWorldGenDefinition(pokeWorldGenDefinition);
});