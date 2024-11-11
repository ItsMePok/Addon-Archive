// scripts/main.ts
import { world, ItemStack } from "@minecraft/server";
var PokeCopperHorns = class {
  onCompleteUse(data) {
    let MelodyTrack = `melody.${data.itemStack?.typeId}`;
    let BassTrack = `bass.${data.itemStack?.typeId}`;
    let HarmonyTrack = `harmony.${data.itemStack?.typeId}`;
    if (data.source.isJumping) {
      data.source.playSound(BassTrack);
      data.source.playSound(HarmonyTrack);
      data.source.playSound(MelodyTrack);
    } else if (data.source.isSneaking) {
      data.source.playSound(BassTrack);
    } else if (data.source.getViewDirection().y >= 0.45) {
      data.source.playSound(HarmonyTrack);
    } else {
      data.source.playSound(MelodyTrack);
    }
    data.source.startItemCooldown(`goat_horn`, 140);
  }
};
var PokeGoatHorn = class {
  onCompleteUse(data) {
    data.source.playSound(`horn.${data.itemStack?.typeId}`);
    data.source.startItemCooldown(`goat_horn`, 140);
  }
};
world.afterEvents.entityDie.subscribe((data) => {
  if (!(data.deadEntity.typeId == "minecraft:goat"))
    return;
  else if (Math.random() >= 0.95) {
    if (Math.random() >= 0.5)
      data.deadEntity.dimension.spawnItem(new ItemStack(`poke:fly_goat_horn`, 1), data.deadEntity.location);
    else
      data.deadEntity.dimension.spawnItem(new ItemStack(`poke:resist_goat_horn`, 1), data.deadEntity.location);
  }
});
world.beforeEvents.worldInitialize.subscribe((data) => {
  data.itemComponentRegistry.registerCustomComponent(
    "poke:copper_horn",
    new PokeCopperHorns()
  );
  data.itemComponentRegistry.registerCustomComponent(
    "poke:goat_horn",
    new PokeGoatHorn()
  );
});

//# sourceMappingURL=../debug/main.js.map
