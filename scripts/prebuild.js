const fs = require("fs-extra");
const path = require("path");

const sourceFolder = path.join(__dirname, "dist", "release"); // ou "release" direto, se for fora do dist
const backupsDir = path.join(__dirname, "backups");

// Gera timestamp tipo: backup-2025-04-06_17-30-12
const now = new Date();
const timestamp = now.toISOString().replace(/:/g, "-").split(".")[0].replace("T", "_");
const backupFolder = path.join(backupsDir, `backup-${timestamp}`);

(async () => {
  try {
    // Verifica se a pasta de origem existe
    if (!fs.existsSync(sourceFolder)) {
      console.error(`❌ Pasta de origem não encontrada: ${sourceFolder}`);
      process.exit(1);
    }

    // Cria pasta backups se não existir
    await fs.ensureDir(backupsDir);

    // Copia o conteúdo da pasta release para backup
    await fs.copy(sourceFolder, path.join(backupFolder, "release"));

    console.log(`✅ Backup criado em: ${backupFolder}`);
  } catch (err) {
    console.error("❌ Erro ao criar backup:", err);
    process.exit(1);
  }
})();
