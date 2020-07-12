import axios from "axios";

export const apiUrl = process.env.NODE_ENV == 'production' ? 'placeholder' : 'http://localhost:8888';
