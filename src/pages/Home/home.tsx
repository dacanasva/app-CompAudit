import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  useIonRouter
} from '@ionic/react';
import { cameraOutline, scanOutline } from 'ionicons/icons';
import './home.css';

const Home = () => {
  const router = useIonRouter();

  const CustomButton = ({ icon, title, description, route }: any) => (
    <div className="custom-button" onClick={() => router.push(route, "forward")}>
      <div className="icon-container">
        <IonIcon icon={icon} className="custom-icon" />
      </div>
      <div className="divider" />
      <div className="text-container">
        <div className="button-title">{title}</div>
        <div className="button-description">{description}</div>
      </div>
    </div>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-bg">
        <div className="home-container">
          <img
            src="logo-CompuAudit.png"
            alt="Logo"
            className="home-icon"
          />

          <CustomButton
            icon={cameraOutline}
            title="CAMARA"
            description="Captura imágenes para evidencia de auditoria"
            route="/camera"
          />

          <CustomButton
            icon={scanOutline}
            title="ESCANER"
            description="Escanea códigos QR o de barras para inventario de los productos"
            route="/scanner"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
