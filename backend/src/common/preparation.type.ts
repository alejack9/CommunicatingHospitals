/**
 * Used in PreparationInterface
 */
const PreparationTypesArray = [
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

type PreparationType = typeof PreparationTypesArray[number];

/**
 * Used in PreparationSchema
 */
// const PreparationTypes = Object.keys(PreparationTypesEnum).filter(
//   k => typeof PreparationTypesEnum[k as any] === 'number',
// );
export { PreparationTypesArray, PreparationType };
