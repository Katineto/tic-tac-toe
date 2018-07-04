const tamagochiBuilder = (name) => {
    let health = 100
    let hunger = 50
    let happiness = 50
    return {
        name,
        feed: () => {
            hunger <= 100 && hunger >=30 ? hunger -= 10 : hunger += 0
            return hunger
        }
    }
}
const nanas = tamagochiBuilder('Nanas')
console.log(nanas.feed())
console.log(nanas.feed())
console.log(nanas)