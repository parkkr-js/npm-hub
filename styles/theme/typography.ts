/* 구체적인 사이즈 나오면 수정
 */

const typography = {
  fontSize: {
    'display-1': ['3.75rem', { lineHeight: '4.5rem' }],
    'display-2': ['3rem', { lineHeight: '3.75rem' }],
    'heading-1': ['2.5rem', { lineHeight: '3.25rem' }],
    'heading-2': ['2rem', { lineHeight: '2.75rem' }],
    'heading-3': ['1.75rem', { lineHeight: '2.25rem' }],
    'heading-4': ['1.5rem', { lineHeight: '2rem' }],
    'title-1': ['1.25rem', { lineHeight: '1.75rem' }],
    'title-2': ['1.125rem', { lineHeight: '1.5rem' }],
    'body-1': ['1rem', { lineHeight: '1.5rem' }],
    'body-2': ['0.875rem', { lineHeight: '1.25rem' }],
    caption: ['0.75rem', { lineHeight: '1rem' }],
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;
export default typography;
