/**
 * A Behaviour is a set of Effects to allow the creation of complex items.
 * For example, an item would be able to increase a Reoz (= creature) statiety
 * AND happiness, with different power (= efficiency).
 *
 * @param effects {Effect[]}
 * @constructor
 */
function Behaviour (effects) {
    this.effects = effects;
}

module.exports = Behaviour;