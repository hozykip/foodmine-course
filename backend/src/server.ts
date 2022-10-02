import express from "express";
import cors from "cors"
import { sample_foods, sample_tags } from "./data";

const app = express()
app.use(cors({
    credentials: true,
    origin: ["http://127.0.0.1:4200"]
}))

app.get('/api/foods', (req, res) => {
    res.send(sample_foods)
})

app.get('/api/foods/tags', (req, res) => {
    res.send(sample_tags)
})

app.get('/api/foods/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm
    const foods = sample_foods
        .filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods)
})

app.get('/api/foods/tag/:tagName', (req, res) => {
    const tag = req.params.tagName
    const foods = sample_foods.filter(food => food.tags?.includes(tag))
    res.send(foods)
})

app.get('/api/foods/:foodId', (req, res) => {
    const foodId = req.params.foodId
    const food = sample_foods.find(food => food.id == foodId)
    res.send(food)
})

const port = 5000;
app.listen(port, () => {
    console.log('Website served on http://127.0.0.1:' + port)
})