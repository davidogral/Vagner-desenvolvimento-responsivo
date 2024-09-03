const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Defina o diretório de entrada e saída
const inputDir = 'assets/images';
const outputDir = 'assets/images/compressed';

// Verifique se o diretório de saída existe, senão crie
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Função para comprimir imagens
const compressImage = async (inputPath, outputPath, format) => {
  try {
    await sharp(inputPath)
      .toFormat(format, { quality: 80 })
      .toFile(outputPath);
    console.log(`Imagem ${inputPath} comprimida com sucesso como ${outputPath}`);
  } catch (error) {
    console.error(`Erro ao comprimir ${inputPath}:`, error);
  }
};

// Processa cada arquivo no diretório de entrada
fs.readdirSync(inputDir).forEach(file => {
  const inputFilePath = path.join(inputDir, file);
  const outputFilePathJpg = path.join(outputDir, `${path.parse(file).name}.jpg`);
  const outputFilePathWebp = path.join(outputDir, `${path.parse(file).name}.png`);

  // Verifica se o arquivo é .tif
  if (path.extname(file).toLowerCase() === '.tif') {
    compressImage(inputFilePath, outputFilePathJpg, 'jpeg');
    compressImage(inputFilePath, outputFilePathWebp, 'png');
  }
});
