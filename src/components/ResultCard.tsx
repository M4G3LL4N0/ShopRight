interface ResultCardProps {
  title: string;
  item: string;
  explanation: string;
}

export function ResultCard({ title, item, explanation }: ResultCardProps) {
  return (
    <div className="bg-gray-800/20 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/20 hover:border-gray-700/40 transition-all transform hover:scale-[1.02] shadow-xl shadow-black/20">
      <h3 className="text-sm font-medium text-gray-400 mb-3">{title}</h3>
      <h2 className="text-2xl font-semibold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-pink-300">
        {item}
      </h2>
      <p className="text-gray-300 leading-relaxed">{explanation}</p>
    </div>
  );
}
