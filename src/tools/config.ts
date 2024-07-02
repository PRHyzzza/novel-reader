
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
 const localConfig = await localforage.getItem('configBook')
 if (localConfig) {
  config.value = JSON.parse(localConfig as string)
 }
}

const setConfig = (newConfig: Config) => {
 config.value = newConfig
}

watch(config, (newValue) => {
 localforage.setItem('configBook', JSON.stringify(newValue))
},{deep: true})

export {
 config,
 setConfig,
 initConfig
}
