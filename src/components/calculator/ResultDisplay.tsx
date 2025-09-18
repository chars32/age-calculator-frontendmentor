interface Age {
  years: number;
  months: number;
  days: number;
}

interface ResultDisplayProps {
  age: Age | null;
}

const ResultDisplay = ({ age }: ResultDisplayProps) => {
  return (
    <div className="mt-12">
      <p className="text-6xl sm:text-8xl font-extrabold italic">
        <span className="text-purple-600">{age ? age.years : "--"}</span>
        <span className="text-gray-900"> años</span>
      </p>
      <p className="text-6xl sm:text-8xl font-extrabold italic">
        <span className="text-purple-600">{age ? age.months : "--"}</span>
        <span className="text-gray-900"> meses</span>
      </p>
      <p className="text-6xl sm:text-8xl font-extrabold italic">
        <span className="text-purple-600">{age ? age.days : "--"}</span>
        <span className="text-gray-900"> dias</span>
      </p>
    </div>
  );
};

export default ResultDisplay;
