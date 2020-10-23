import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VoiceCaptureService } from 'src/app/services/voice-capture.service';

@Component({
  selector: 'app-voice-capture',
  templateUrl: './voice-capture.component.html',
  styleUrls: ['./voice-capture.component.css']
})
export class VoiceCaptureComponent implements OnDestroy {
  isRecording = false;
  recordedTime;
  blobUrl;


  unsafeString:string = "unsafe:";
  textFromVoice:string = "Ce texte s'adaptera à ce qui a été dit.";
  captureLink;//safe link
  voiceCaptureBlob;


  constructor(private audioRecordingService: VoiceCaptureService, private sanitizer: DomSanitizer) {

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
      //this.captureLink = this.sanitizer.sanitize;
      this.voiceCaptureBlob = data.blob;

      //this.captureLink = "blob:"+
      // if (this.captureLink.includes(this.unsafeString)) {
      //   this.captureLink = this.captureLink.substring(this.unsafeString.length);
      // }
      // console.log(this.blobUrl.changingThisBreaksApplicationSecurity);
    });
  }
  saveVoiceCapture(){
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

  ngOnDestroy(): void {
    this.abortRecording();
  }

}
