/**
 * Used in PreparationInterface
 */
const PreparationTypes = [
  'Liquid',
  'Tablet',
  'Capsules',
  'Topical Medicines',
  'Suppositories',
  'Drops',
  'Inhalers',
  'Injections',
  'Implants',
  'Buccal',
];

type PreparationTypesEnum = typeof PreparationTypes[number];

/**
 * Used in PreparationSchema
 */
// const PreparationTypes = Object.keys(PreparationTypesEnum).filter(
//   k => typeof PreparationTypesEnum[k as any] === 'number',
// );
export { PreparationTypes, PreparationTypesEnum };
