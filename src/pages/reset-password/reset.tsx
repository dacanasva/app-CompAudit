import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonLabel,
  IonText,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import "./reset.css";

const RecuperarContrasena = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useIonRouter();

  const handleRecuperar = async () => {
    try {
      const response = await fetch("https://api.tudominio.com/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: correo }),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el enlace de recuperación");
      }

      setMensaje("Revisa tu correo para restablecer tu contraseña");
      setError("");
      setShowToast(true);
    } catch (err: any) {
      setError(err.message || "Error al intentar recuperar la contraseña");
      setMensaje("");
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-bg">
        <div className="login-box">
          <div className="login-top">
            <img
              src="logo-blancoLineaestetica.png"
              alt="Logo"
              className="login-icon"
            />
          </div>
          <div className="login-body">
            <IonText>
              <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
                Recuperar Contraseña
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginBottom: "16px",
                }}
              >
                Ingresa tu correo electrónico para restablecer tu contraseña.
              </p>
            </IonText>

            <IonInput
              className="login-input"
              placeholder="Correo electrónico"
              type="email"
              value={correo}
              onIonChange={(e) => setCorreo(e.detail.value ?? "")}
            />

            <IonButton
              expand="block"
              className="login-button"
              onClick={handleRecuperar}
            >
              ENVIAR ENLACE
            </IonButton>

            <IonText className="forgot" style={{ textAlign: "center" }}>
              ¿Ya la recordaste?{" "}
              <a
                href="/login"
                style={{ fontWeight: "bold", textDecoration: "none" }}
              >
                Iniciar sesión
              </a>
            </IonText>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          message={mensaje || error}
          duration={3000}
          color={mensaje ? "success" : "danger"}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default RecuperarContrasena;
