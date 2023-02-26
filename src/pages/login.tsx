import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material";
import { css } from "@emotion/react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";
import { app } from "../lib/firebase";

const Login = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pleaseLoginAlertOpen, setPleaseLoginAlertOpen] = useState(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/");
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleClose = async () => {
    await router.push("/");
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: column;
      `}
    >
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"alreadyLogined"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar>
      <Snackbar
        open={!isLoggedIn && pleaseLoginAlertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"pleaseLogin"}
      >
        <Alert
          onClose={(pleaseLoginAlertOpen) =>
            setPleaseLoginAlertOpen(!pleaseLoginAlertOpen)
          }
          severity="warning"
        >
          ログインしてください
        </Alert>
      </Snackbar>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
            css={css`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 16px;
          `}
        >
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
            css={css`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 16px;
          `}
        >
          <Button type="submit" variant="outlined">
            ログイン
          </Button>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
          `}
        >
          ユーザ登録は
          <Link href={"/signup"}>こちら</Link>
          から
        </div>
      </form>
    </div>
  );
};

export default Login;
