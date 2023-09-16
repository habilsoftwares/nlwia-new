import ytdl from "ytdl-core"
import fs from "fs"
//import { error } from "console"
//import { resolve } from "path"
//import { rejects } from "assert"

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID
    console.log("Realizando o download do vídeo:", videoID)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração do vídeo é maior que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível fazer o download do vídeo. Detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
