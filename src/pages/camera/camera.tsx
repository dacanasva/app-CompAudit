import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import './camera.css';

const CameraPage = () => {
  const [fotoBase64, setFotoBase64] = useState<string | undefined>();

  const capturarFoto = async () => {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    setFotoBase64(photo.dataUrl);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="camera-fondo">
        <div className="camera-contenedor">
          <IonButton expand="block" onClick={capturarFoto}>
            Tomar Foto
          </IonButton>

          {fotoBase64 && (
            <IonCard>
              <IonCardContent>
                <img src={fotoBase64} alt="Foto tomada" className="foto-preview" />
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
