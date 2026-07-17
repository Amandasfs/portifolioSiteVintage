interface Props {
  disabled?: boolean;
}

export default function GiftInfoCard({
  disabled,
}: Props) {
  return (
    <div
      className="
        relative
        max-w-4xl
        mx-auto
        mb-12
        overflow-hidden
        rounded-3xl
        p-8
      "
      style={{
        backgroundColor: "#4d6648",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/xv.png')",
        border: "2px solid #DE9B72",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <h3
        className="
          font-romantic
          text-4xl
          text-background
          text-center
          mb-4
        "
      >
        Uma pequena mensagem
      </h3>

      <p
        className="
          text-background
          text-center
          leading-8
        "
      >
        Se desejar nos presentear,
        escreva uma mensagem para guardarmos
        com carinho e lembrarmos deste dia
        para sempre.
      </p>
    </div>
  );
}