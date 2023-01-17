import { Directive, HostBinding, HostListener, Output, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { FileHandle } from './file-handle';
import { NotificationService } from '../services/notification.service';


@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandle[]>= new EventEmitter();
  @HostBinding("style.background") private background= "#eee";
  

  constructor(private sanitizer: DomSanitizer, private notificationSvc: NotificationService) { }


  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background= "#999"; // cuando se sube una img cambia de color la zona drag and drop,
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background= "#eee"; // cuando no hay ninguna img vuelve a color original
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background= "#eee"; 

    // logica
    let files: FileHandle[]= [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file= evt.dataTransfer.files[i];
      const url= this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      // compruebo que la img es valida.
      if(file.size <= 4000000){
        if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/webp'){
          files.push({file, url});
          this.files.emit(files);     
        }else{
          this.notificationSvc.openSnackBar('El formato '+file.type+' no es compatible.', 'close');
        }
      }else{
        this.notificationSvc.openSnackBar('Tamaño maximo de la imagen es de 4MB.', 'close');
      }   
    }
  }

}
