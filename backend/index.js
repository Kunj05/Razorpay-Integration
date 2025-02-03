import express from "express"
import cors from "cors"
import  paymentRoutes from "./routes/payment.route.js"

const app = express()

app.use(cors({
    origin: ['http://localhost:5173'], // Add localhost to the allowed origins
    credentials: true,
}));
 
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/payment",paymentRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.listen(5000,(req,res)=>{
    console.log('Server is running on port 5000')
})