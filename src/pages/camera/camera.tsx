import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonTextarea,
  IonIcon,
  IonAlert,
} from '@ionic/react';
import { cameraOutline, trashOutline, warningOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import './camera.css';

const CameraPage = () => {
  const [fotoBase64, setFotoBase64] = useState<string | undefined>();
  const [descripcion, setDescripcion] = useState<string>('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarAlertaVisual, setMostrarAlertaVisual] = useState(false);

  const capturarFoto = async () => {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    setFotoBase64(photo.dataUrl);
  };

  const cancelarFoto = () => {
    setFotoBase64(undefined);
  };

  const guardar = () => {
    if (!fotoBase64 || descripcion.trim() === '') {
      setMostrarAlertaVisual(true);

      // Ocultar la alerta visual después de 4 segundos
      setTimeout(() => setMostrarAlertaVisual(false), 4000);
      return;
    }

    setMostrarAlertaVisual(false);
    setMostrarAlerta(true);
  };

  const confirmarGuardar = async () => {
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fotoBase64,
          descripcion,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar en la API');
      }

      setFotoBase64(undefined);
      setDescripcion('');
      alert('✅ Información guardada correctamente.');
    } catch (error) {
      alert('❌ Error al guardar. Verifique la conexión.');
    } finally {
      setMostrarAlerta(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="camera-fondo">
        <div className="camera-card">
          <div className="photo-box">
            {fotoBase64 ? (
              <img src={fotoBase64} alt="Foto tomada" className="preview-img" />
            ) : (
              <div className="placeholder">
                <IonIcon icon={cameraOutline} className="photo-icon" />
                <div style={{ color: '#999' }}>Photo</div>
              </div>
            )}
          </div>

          <IonButton
            expand="block"
            onClick={capturarFoto}
            className="icon-button purple-button"
          >
            <IonIcon icon={cameraOutline} slot="icon-only" />
          </IonButton>

          <IonButton
            expand="block"
            onClick={cancelarFoto}
            className="icon-button red-button"
            disabled={!fotoBase64}
          >
            <IonIcon icon={trashOutline} slot="icon-only" />
          </IonButton>

          <IonTextarea
            placeholder="Descripción"
            value={descripcion}
            onIonChange={(e) => setDescripcion(e.detail.value!)}
            className="textarea-description"
          ></IonTextarea>

          {/* ⚠️ Alerta visual fija */}
          {mostrarAlertaVisual && (
            <div style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              border: '1px solid #ffeeba',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '12px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}>
              <IonIcon icon={warningOutline} style={{ marginRight: '8px', fontSize: '20px' }} />
              Debe tomar una foto y escribir una descripción antes de guardar.
            </div>
          )}

          <IonButton expand="block" onClick={guardar} className="purple-button">
            Guardar
          </IonButton>
        </div>

        {/* Confirmación al guardar */}
        <IonAlert
          isOpen={mostrarAlerta}
          onDidDismiss={() => setMostrarAlerta(false)}
          header="Confirmación"
          message="¿Deseas guardar esta información?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'alert-button-cancel',
            },
            {
              text: 'Guardar',
              handler: confirmarGuardar,
              cssClass: 'alert-button-confirm',
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
