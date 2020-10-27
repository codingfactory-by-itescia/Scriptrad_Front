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
  voiceCaptureBlob;


  constructor(private audioRecordingService: VoiceCaptureService, private sanitizer: DomSanitizer, private apiManager : ApiManagerServiceService) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

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
      this.textFromVoice = "A votre écoute !";
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
      this.textFromVoice = "**Résultat transcrit**";


    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  //cette méthode contient plusieurs tentatives de post que je n'ai pas réussi à faire lancer
  sendSoundCapture() {
    // const selectedFileList = (<HTMLInputElement>document.getElementById('myCapture')).files;

    // const file = selectedFileList.item(0);
    // const formData = new FormData();
    // formData.append("file", file);
    // console.log(file);
    // this.apiManager.postSoundCapture(file).subscribe(event => {
    //   console.log(event);
    // });

    // this.apiManager.postSoundCapture().subscribe((data)=>{
    //   console.log(data);
    // });
  }

  upload(files: File) {
    const formData = new FormData();
    const file = files[0];
    formData.append("file", file);
    //pour le moment ça fonctionne avec une méthode get mais dans l'idée, on le remplacera par un post
    this.apiManager.sendFileByGet(file.name).subscribe((data)=>{
      console.log(data);
    });
  }

  ngOnInit() : void {
    this.apiManager.getNews().subscribe((data)=>{
      console.log(data);
    });

    this.apiManager.testPost().subscribe((data)=>{
      console.log(data);
    });

  }
  ngOnDestroy(): void {
    this.abortRecording();
  }
}
