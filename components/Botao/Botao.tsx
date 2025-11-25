interface BotaoProps {
  label: string;
  onClick: () => void;
}

export default function Botao({ label, onClick }: BotaoProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}