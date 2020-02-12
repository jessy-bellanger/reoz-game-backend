/**
 * This class aims to mimic an enum like Java.
 * It's role is to define a set of type of effects that will be used
 * by various items. For example, a TOY would affect a Reoz's happiness,
 * whereas a FOOD would affect its satiety. We can imagine glasses that
 * will use the INTELLIGENCE effect type to increase its intelligence.
 *
 * @param name {string}
 * @constructor
 */
function EffectType(name) {
    this.name = name;
}

const EffectTypes = {
    TOY         : "TOY",
    FOOD        : "FOOD",
    LOVE        : "LOVE",
    LUCK        : "LUCK",
    INTELLIGENCE: "INTELLIGENCE"
};

// This replaces every string with a true frozen EffectType to simulate an enum
for (let effectTypeName in EffectTypes) {
    EffectTypes[effectTypeName] = Object.freeze(new EffectType(effectTypeName));
}

// This is frozen to simulate a Java-like enum (values can't be updated)
module.exports = Object.freeze(EffectTypes);