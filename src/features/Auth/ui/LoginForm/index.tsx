import { Button, Input, Label } from "@shared/ui";
import { type FC, type FormEvent, useState } from "react";
import { signIn } from "../../api/authApi";
import "./style.css";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn(email, password);

    setIsSubmitting(false);
    if (result.error) setError(result.error);
  };

  return (
    <div className="login-form__wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form__field">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="login-form__input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="login-form__field">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            className="login-form__input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p className="login-form__error">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Входим..." : "Войти"}
        </Button>
      </form>
    </div>
  );
};
