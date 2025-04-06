// Importa módulos nativos do Node.js
import fs from "fs"; // Módulo para manipular arquivos e pastas
import path from "path"; // Módulo para lidar com caminhos de arquivos
import archiver from "archiver"; // Biblioteca para criar arquivos .zip
import cliProgress from "cli-progress"; // Biblioteca para mostrar barra de progresso no terminal

// Caminho para a pasta de saída do build do Electron
const outputDir = path.join(__dirname, "..", "release");

// Caminho para a pasta que contém os arquivos extraídos do instalador
const unpackedDir = path.join(outputDir, "win-unpacked");

// Caminho para o instalador gerado (arquivo Setup)
const installerPath = fs
  .readdirSync(outputDir)
  .find(file => file.startsWith("Setup") && file.endsWith(".exe"));

// Caminho completo para o arquivo .zip que será criado
const zipFilePath = path.join(outputDir, "app-portable.zip");

// Caminhos para as pastas que vamos organizar no final
const portableDir = path.join(outputDir, "portable");
const exeDir = path.join(outputDir, "exe");

// Cria uma barra de progresso usando cli-progress
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// Função para zipar a pasta 'win-unpacked'
function zipDirectory(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } }); // Compactação nível máximo
  const stream = fs.createWriteStream(out); // Stream de escrita do zip

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false) // Adiciona todos os arquivos da pasta sem criar uma subpasta
      .on("error", err => reject(err)) // Lida com erros
      .on("progress", data => {
        // Atualiza a barra de progresso
        const progress = data.fs.processedBytes / data.fs.totalBytes;
        progressBar.update(progress);
      })
      .pipe(stream);

    stream.on("close", () => {
      progressBar.update(1); // Finaliza a barra de progresso
      progressBar.stop(); // Para de exibir
      resolve(); // Termina a promise
    });

    archive.finalize(); // Inicia a compactação
  });
}

// Função principal que orquestra todas as etapas pós-build
async function postBuild() {
  console.log("🔧 Pós-build iniciado...");
  progressBar.start(1, 0); // Inicia a barra de progresso com valor 0

  try {
    // Cria o arquivo .zip a partir da pasta 'win-unpacked'
    await zipDirectory(unpackedDir, zipFilePath);
    console.log("✅ Arquivo .zip criado com sucesso!");

    // Garante que as pastas 'portable' e 'exe' existem (ou cria elas)
    fs.mkdirSync(portableDir, { recursive: true });
    fs.mkdirSync(exeDir, { recursive: true });

    // Move o arquivo .zip para a pasta 'portable'
    fs.renameSync(zipFilePath, path.join(portableDir, "app-portable.zip"));

    // Move o instalador Setup para a pasta 'exe'
    if (installerPath) {
      fs.renameSync(path.join(outputDir, installerPath), path.join(exeDir, installerPath));
    }

    console.log("📁 Arquivos organizados com sucesso!");

    // Lista todos os arquivos e pastas dentro de 'release'
    const allFiles = fs.readdirSync(outputDir);

    for (const file of allFiles) {
      const filePath = path.join(outputDir, file);

      // Se for uma pasta que não seja 'portable' ou 'exe', deleta recursivamente
      if (fs.statSync(filePath).isDirectory() && !["portable", "exe"].includes(file)) {
        fs.rmSync(filePath, { recursive: true, force: true });
      }

      // Se for um arquivo que não seja o zip ou o setup já movidos, deleta
      if (
        fs.statSync(filePath).isFile() &&
        file !== "app-portable.zip" &&
        !file.startsWith("Setup")
      ) {
        fs.unlinkSync(filePath);
      }
    }

    console.log("🧹 Arquivos limpos!");
    console.log("🎉 Pós-build concluído!");
  } catch (error) {
    console.error("❌ Erro durante o pós-build:", error);
    progressBar.stop(); // Garante que a barra pare mesmo em caso de erro
  }
}

// Executa a função principal
postBuild();
