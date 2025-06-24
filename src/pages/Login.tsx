import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonLabel,
  IonText,
  IonToggle,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useIonRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.tudominio.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: correo, password: contrasena }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/home", "root");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
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
            <IonInput
              className="login-input"
              placeholder="Correo electronico"
              type="email"
              value={correo}
              onIonChange={(e) => setCorreo(e.detail.value ?? "")}
            />

            <IonInput
              className="login-input"
              placeholder="Contraseña"
              type="password"
              value={contrasena}
              onIonChange={(e) => setContrasena(e.detail.value ?? "")}
            />

            <div className="remember-me">
              <IonToggle />
              <IonLabel>Acúerdate de mí</IonLabel>
            </div>
            <IonButton
              expand="block"
              className="login-button"
              onClick={handleLogin}
            >
              INICIAR SESIÓN
            </IonButton>
            <IonText className="forgot">
              ¿Olvidaste tu contraseña?{" "}
              <a
                href="/home"
                style={{ fontWeight: "bold", textDecoration: "none" }}
              >
                Recuperar
              </a>
            </IonText>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          message={error}
          duration={2500}
          color="danger"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
