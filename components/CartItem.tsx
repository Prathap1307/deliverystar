import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import type { CartItem as CartItemType } from '@/components/context/CartContext';

interface Props {
  item: CartItemType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="relative h-24 w-24 rounded-xl overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label={`Remove ${item.name}`}
          >
            <FiTrash2 />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full bg-gray-100 px-3 py-1.5">
            <button
              onClick={() => onDecrease(item.id)}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-50"
              aria-label={`Decrease ${item.name}`}
            >
              <FiMinus />
            </button>
            <span className="min-w-[32px] text-center text-base font-semibold">{item.quantity}</span>
            <button
              onClick={() => onIncrease(item.id)}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-50"
              aria-label={`Increase ${item.name}`}
            >
              <FiPlus />
            </button>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
