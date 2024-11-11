import { world, ItemComponentCompleteUseEvent, ItemStack } from "@minecraft/server";

/**
 * Copper Horns
 * - Plays all 3 if jumping
 * else
 * - Plays Bass if sneaking
 * else
 * - Plays Harmony if looking up at least 45°
 * else
 * - Plays Melody
 */
class PokeCopperHorns{
  onCompleteUse(data:ItemComponentCompleteUseEvent){
    let MelodyTrack = `melody.${data.itemStack?.typeId}`
    let BassTrack = `bass.${data.itemStack?.typeId}`
    let HarmonyTrack = `harmony.${data.itemStack?.typeId}`
    //All
    if (data.source.isJumping){
      data.source.playSound(BassTrack)
      data.source.playSound(HarmonyTrack)
      data.source.playSound(MelodyTrack)
    }else
    //Bass
    if (data.source.isSneaking){
      data.source.playSound(BassTrack)
    }else 
    //Harmony
    if (data.source.getViewDirection().y >= 0.45){
      data.source.playSound(HarmonyTrack)
    }
    //Melody
    else {
      data.source.playSound(MelodyTrack)
    }
    data.source.startItemCooldown(`goat_horn`,140)
  }
}

/**
 * Normal Goat Horn Functionality
 */
class PokeGoatHorn{
  onCompleteUse(data:ItemComponentCompleteUseEvent){
    data.source.playSound(`horn.${data.itemStack?.typeId}`)
    data.source.startItemCooldown(`goat_horn`,140)
  }
}

/**
 *  2 Removed normal horns obtaining
 */
world.afterEvents.entityDie.subscribe(data => {
  if (!(data.deadEntity.typeId=='minecraft:goat'))return;
  else if (Math.random() >= 0.95){
    if (Math.random() >= 0.5) data.deadEntity.dimension.spawnItem(new ItemStack(`poke:fly_goat_horn`,1),data.deadEntity.location);
    else data.deadEntity.dimension.spawnItem(new ItemStack(`poke:resist_goat_horn`,1),data.deadEntity.location);
  }
})

/**
 * Custom Component Registering
 */
world.beforeEvents.worldInitialize.subscribe(data => {
  data.itemComponentRegistry.registerCustomComponent(
    "poke:copper_horn", new PokeCopperHorns()
  )
  data.itemComponentRegistry.registerCustomComponent(
    "poke:goat_horn", new PokeGoatHorn()
  )
})