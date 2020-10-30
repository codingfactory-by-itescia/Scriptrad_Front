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
      this.textFromVoice = result.alternatives[0].transcript;
      //à mon sens Star Wars est plutôt une œuvre intéressante en effet elle raconte l'histoire d'une galaxie lointaine ce film a permis de lancer beaucoup de carrière d'acteur il s'inspire de beaucoup de vivre comme le Seigneur des Anneaux de Tolkien ou encore des orages des des ouvrages le succès est mondialement connu et c'est une grande communauté de fan qui est né de cela
      const textTest = "Test de micro Transcript: alors ceci est un enregistrement pour tester la pays de Google et afin de savoir si la transcription est fonctionnelle il y a en ce moment même Imed qui est derrière moi ceci afin de observer si le programme est belle et bien fonctionnel comme je l'ai dit précédemment";
    this.apiManager.summarize(this.textFromVoice).subscribe((dataSummarized)=>{
      console.log(dataSummarized);
      this.textFromVoiceSummarized = dataSummarized.toString();
      // this.textFromVoiceSummarized = dataTranscripted as string;
    });
      //la suite, ce sera sur le même modèle pour le résumé
      // this.apiManager.summarize(this.textFromVoice).subscribe((dataSummarized)=>{
      //   console.log(dataSummarized);
      //   // this.textFromVoiceSummarized = dataTranscripted as string;
      // });
      // this.apiManager.transcript(file.name).subscribe((dataTranscripted)=>{
      //   console.log(dataTranscripted);
      //   this.textFromVoice = dataTranscripted as string;
      // });
    });
  }

  ngOnInit() : void {
      //pour tester si on arrive bien à envoyer une requête get au serveur
    // this.apiManager.getNews().subscribe((data)=>{
    //   console.log(data);
    // });
      //idem mais en un peu plus complexe
    // this.apiManager.sendFileByGet(file.name).subscribe((data)=>{
    //   console.log(data);
    //   this.textFromVoice = data as string;
    // });
    // const textTest = "test de micro Transcript: alors ceci est un enregistrement pour tester la pays de Google. et afin de savoir si la transcription est fonctionnelle. il y a en ce moment même Imed qui est derrière moi ceci afin de observer si le programme est belle et bien fonctionnel. comme je l'ai dit précédemment.";
    // const textTest = "Test de micro Transcript: alors ceci est un enregistrement pour tester la pays de Google et afin de savoir si la transcription est fonctionnelle il y a en ce moment même Imed qui est derrière moi ceci afin de observer si le programme est belle et bien fonctionnel comme je l'ai dit précédemment";
    //const textTest = "Alors ceci est un enregistrement pour tester la pays de Google et afin de savoir si la transcription est fonctionnelle, il y a en ce moment même Imed qui est derrière moi ceci afin de observer si le programme est belle et bien fonctionnel comme je l'ai dit précédemment.";
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
