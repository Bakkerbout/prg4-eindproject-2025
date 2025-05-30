import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Runner: new ImageSource('images/runner.png'),
    Hurdle: new ImageSource('images/hurdle.png'),
    Heart: new ImageSource('images/heart.png'),
    Bal: new ImageSource('images/bal.png'),
    Background: new ImageSource('images/background.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }