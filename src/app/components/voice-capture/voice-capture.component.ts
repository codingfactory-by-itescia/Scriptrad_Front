import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VoiceCaptureService } from 'src/app/services/voice-capture.service';
import {ApiManagerServiceService} from 'src/app/services/api-manager-service.service';

@Component({
  selector: 'app-voice-capture',
  templateUrl: './voice-capture.component.html',
  styleUrls: ['./voice-capture.component.css']
})
export class VoiceCaptureComponent implements OnDestroy {
  //record
  isRecording = false;
  recordedTime;
  blobUrl;


  unsafeString:string = "unsafe:";
  textFromVoice:string = "Ce texte s'adaptera à ce qui a été dit.";
  textFromVoiceTraduced:string = "Ce texte sera la traduction du résultat.";
  textFromVoiceSummarized:string = "Ce texte résumera les idées.";
  voiceCaptureBlob;


  constructor(private audioRecordingService: VoiceCaptureService, private sanitizer: DomSanitizer, private apiManager : ApiManagerServiceService) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    //est-ce que ça pourrait servir ? Je le laisse pour le moment mais pas sûr car on a déjà un moyen de DL
    function download(text, name, type) {
      const a:any = document.getElementById("a");
      const file = new Blob([text], {type: type});
      a.href = URL.createObjectURL(file);
      a.download = name;
    }

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.voiceCaptureBlob = data.blob;
    });
  }

  saveVoiceCapture(){
    console.log(this.voiceCaptureBlob);
    var url= window.URL.createObjectURL(this.voiceCaptureBlob);
    window.open(url);
  }
  safeUrl(url:string){

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  upload(files: File) {
    const formData = new FormData();
    const file = files[0];
    formData.append("file", file);
    this.textFromVoice = "***En cours de transcription... Cela prendra autant de secondes que dure l'enregistrement...***";
    this.apiManager.transcript(file.name).subscribe((dataTranscripted: any)=>{
      console.log(dataTranscripted);
      let result = JSON.parse(dataTranscripted)
      this.textFromVoice = result.message;
      
      this.apiManager.summarize(this.textFromVoice).subscribe((dataSummarized)=>{
        console.log(dataSummarized);
        this.textFromVoiceSummarized = dataSummarized.toString();
      });
    });
  }

  ngOnInit() : void {
    // Enlever les commentaires si besoin de tester le résumé sans upload l'audio
    // const textTest = "C'est parti pour un petit enregistrement, est-ce que là du coup on va réussir à avoir un texte avec un point ça c'est à se demander si ça va marcher en tout cas, j'espère que ça va marcher. Merci.";
    // this.apiManager.summarize(textTest).subscribe((dataSummarized)=>{
    //   console.log(dataSummarized);
    //   // this.textFromVoiceSummarized = dataTranscripted as string;
    // });
  }
  ngOnDestroy(): void {
    this.abortRecording();
  }
}
