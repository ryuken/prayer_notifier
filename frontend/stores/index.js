/**
 * Created by taushif on 26/02/2017.
 */
import Config from './Config'
import Prayers from './Prayers'
import Reminders from './Reminders'

const stores = {}
stores.config = new Config()
stores.prayers = new Prayers()
stores.reminders = new Reminders()

export default stores