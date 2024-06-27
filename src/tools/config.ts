
import { ref, watch } from "vue";
import localforage from 'localforage'

interface Config {
 fontSize: number;
 lineHeight: number;
}

const config = ref<Config>({
 fontSize: 16,
 lineHeight: 1.5
})

const initConfig = async () => {
 const localConfig = await localforage.getItem('config')
 if (localConfig) {
  config.value = JSON.parse(localConfig as string)
 }
}

const setConfig = (newConfig: Config) => {
 config.value = newConfig
}

watch(config, (newValue) => {
 localforage.setItem('config', JSON.stringify(newValue))
})

export {
 config,
 setConfig,
 initConfig
}
