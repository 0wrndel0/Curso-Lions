import carService from "../services/carService.js";
const createCar = async (req, res, next) => {
  try {
    const car = await carService.createCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
};
const getAllCars = async (req, res, next) => {
  try {
    const cars = await carService.getAllCars();
    res.json(cars);
  } catch (error) {
    next(error);
  }
};
const getCarById = async (req, res, next) => {
  try {
    const car = await carService.getCarById(req.params.id);
    res.json(car);
  } catch (error) {
    next(error);
  }
};
const updateCar = async (req, res, next) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);
    res.json(car);
  } catch (error) {
    next(error);
  }
};
const deleteCar = async (req, res, next) => {
  try {
    const car = await carService.deleteCar(req.params.id);
    res.json({ message: "Carro deletado com sucesso", car });
  } catch (error) {
    next(error);
  }
};
const getCarsByBrand = async (req, res, next) => {
  try {
    const cars = await carService.getCarsByBrand(req.params.brand);
    res.json(cars);
  } catch (error) {
    next(error);
  }
};
const getAvailableCars = async (req, res, next) => {
  try {
    const cars = await carService.getAvailableCars();
    res.json(cars);
  } catch (error) {
    next(error);
  }
};
const updateAvailability = async (req, res, next) => {
  try {
    const car = await carService.updateAvailability(req.params.id, req.body.disponivel);
    res.json(car);
  } catch (error) {
    next(error);
  }
};
const getCarsByPriceRange = async (req, res, next) => {
  try {
    const cars = await carService.getCarsByPriceRange(req.params.min, req.params.max);
    res.json(cars);
  } catch (error) {
    next(error);
  }
};
const getCarByPlate = async (req, res, next) => {
  try {
    const car = await carService.getCarByPlate(req.params.plate);
    res.json(car);
  } catch (error) {
    next(error);
  }
};
const countAvailableCars = async (req, res, next) => {
  try {
    const totalDisponiveis = await carService.countAvailableCars();
    res.json({ totalDisponiveis });
  } catch (error) {
    next(error);
  }
};
export default {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsByBrand,
  getAvailableCars,
  updateAvailability,
  getCarsByPriceRange,
  getCarByPlate,
  countAvailableCars,
};
