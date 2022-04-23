/**
 * Created by taushif on 26/02/2017.
 */
import Config from './Config'
import Prayers from './Prayers'

const stores = {}
stores.config = new Config()
stores.prayers = new Prayers()

export default stores