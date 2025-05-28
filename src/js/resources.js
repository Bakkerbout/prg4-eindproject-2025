import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Runner: new ImageSource('images/runner.png'),
    Hurdle: new ImageSource('images/hurdle.png'),
    Background: new ImageSource('images/background.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }