export interface CaracteristicaProps {
  caracteristica: string;
}

export default function Caracteristica({ caracteristica }: CaracteristicaProps) {
  return (
    <ul className="grid grid-cols-1 gap-4">
    <div className="flex flex-col items-center gap-4 p-4 rounded-xl shadow-md bg-white">
        {caracteristica}
    </div>
    </ul>
  );
}