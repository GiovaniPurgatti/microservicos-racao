package org.example.model;
public class ResponseToken {
    private String msg;
    private String token;

    public ResponseToken(String msg, String token){
        this.msg = msg;
        this.token = token;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

