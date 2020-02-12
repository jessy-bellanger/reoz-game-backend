/**
 * An Effect is a part of a Behaviour. It defines on what it acts, and
 * with which power (or efficiency).
 *
 * @param type {EffectType}
 * @param power {int}
 * @constructor
 */
function Effect(type, power) {
    this.type  = type;
    this.power = power;
}

module.exports = Effect;