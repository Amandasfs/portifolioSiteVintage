interface TokenFormProps {
  token: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function TokenForm({
  token,
  loading,
  onChange,
  onSubmit,
}: TokenFormProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        aria-label="Código do convite"
        placeholder="DIGITE O CÓDIGO DO CONVITE"
        value={token}
        onChange={(e) =>
          onChange(
            e.target.value.toUpperCase()
          )
        }
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border-2
          border-[#DE9B72]
          bg-[#3A5544]/80
          text-[#F8EDEB]
          placeholder-[#DE9B72]/70
          focus:outline-none
          focus:ring-2
          focus:ring-[#DE9B72]
          text-center
          tracking-wider
          sm:tracking-[0.2em]
          font-bold
          uppercase
        "
      />

      <button
        onClick={onSubmit}
        disabled={loading || !token.trim()}
        className="
          w-full
          bg-gradient-to-r
          from-[#442D1C]
          to-[#5A3A24]
          text-[#F8EDEB]
          px-8
          py-3
          rounded-xl
          border-2
          border-[#DE9B72]/40
          disabled:opacity-50
          transition-all
          hover:scale-[1.02]
          font-bold
          uppercase
          tracking-widest
          text-xs
          shadow-md
        "
      >
        {loading
          ? "Buscando..."
          : "Buscar Convite"}
      </button>
    </div>
  );
}