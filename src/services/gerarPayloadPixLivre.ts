export function gerarPayloadPixLivre(
  chave: string,
): string {
  const chaveLimpa = chave.trim();

  if (!chaveLimpa) {
    return "";
  }

  const nome = "Casamento".substring(
    0,
    25,
  );

  const cidade = "Brasil".substring(
    0,
    15,
  );

  const padLength = (
    value: string,
  ): string =>
    String(value.length).padStart(
      2,
      "0",
    );

  const idChavePix =
    `0014br.gov.bcb.pix01${padLength(
      chaveLimpa,
    )}${chaveLimpa}`;

  const payloadBase = [
    "000201",

    `26${padLength(
      idChavePix,
    )}${idChavePix}`,

    "52040000",

    "5303986",

    "5802BR",

    `59${padLength(nome)}${nome}`,

    `60${padLength(cidade)}${cidade}`,

    "62070503***",

    "6304",
  ].join("");

  let crc = 0xffff;

  for (
    let i = 0;
    i < payloadBase.length;
    i++
  ) {
    crc ^=
      payloadBase.charCodeAt(i)
      << 8;

    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc =
          (crc << 1) ^
          0x1021;
      } else {
        crc <<= 1;
      }
    }
  }

  const crcHex = (
    crc & 0xffff
  )
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");

  return (
    payloadBase +
    crcHex
  );
}