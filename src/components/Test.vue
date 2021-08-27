<script lang="tsx">
import { inject, ref, watch } from 'vue'
import { SetupContext } from 'vue'
export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  emits: ['updateID'],
  setup(props: { [key in string]?: any }, { emit }: { emit: SetupContext['emit'] }) {
    let provideID: any = inject('provideID')
    let id: number = props.id / 1
    return () => (
      <>
      <div>
      <div>provideID: { provideID.value }</div>
      <div>propsID: { props.id }</div>
      <button onClick={ () => {
        emit('updateID', id++)
      } }>
        + 1
      </button>
      </div>
      </>
    )
  }
}
</script>

<style>

</style>