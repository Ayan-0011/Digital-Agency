import { brand } from '../../config/brand.js';

// brand.heroWord = 'social365'
// "social" renders solid black, the trailing digits get the shared gradient.
export default function BrandWord({ className = '' }) {
  const chars = [...brand.heroWord];
  const firstDigit = chars.findIndex((c) => /\d/.test(c));
  const split = firstDigit === -1 ? chars.length : firstDigit;
  const gradCount = chars.length - split;

  return (
    <span className={`hx-word ${className}`.trim()} aria-hidden="true">
      {chars.map((char, index) => {
        const isGrad = index >= split;
        const isI = char.toLowerCase() === 'i';
        return (
          <span className="hx-char" key={index}>
            <span
              className={isGrad ? 'hx-grad' : 'hx-solid'}
              style={isGrad ? { '--i': index - split, '--n': gradCount } : undefined}
            >
              {/* dotless i so we can draw the gradient dot ourselves */}
              {isI ? 'ı' : char}
              {isI && <i className="hx-dot" />}
            </span>
          </span>
        );
      })}
    </span>
  );
}