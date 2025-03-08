import { ProcessEventType } from '../../model/ProcessEvents';

export default {
    emit: (type: ProcessEventType, value?: string) => {
        /**
         * Si el proceso no es lanzado como un chilp_process, se imprime en consola del hilo principal.
         * Ya que es el unico existente
         */

        if (process.send) {
            process.send({ type, value });
        }
    }
}
