import { cn } from '@/lib/utils';

const ProductPrice = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  //Ensure two decimal places
  const stringValue = Number(value).toFixed(2);

  //Split into integer and decimal
  const [integerPart, decimalPart] = stringValue.split('.');

  return (
    <p className={cn('text-2xl', className)}>
      <span className="text-xs align-super">$</span>
      {integerPart}
      <span className="text-xs align-super">{decimalPart}</span>
    </p>
  );
};

export default ProductPrice;
