import Header from '@/components/shared/Header'
import { transformationTypes } from '../../../../../../constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

const AddTransformationPage = async ({ params: { type } }: SearchParamProps) => {
    const { userId } = auth()

    if (!userId) redirect('/sign-in')
    const user = await getUserById(userId)

    const transformation = transformationTypes[type]
    return (
        <>
            <Header
                title={transformation.title}
                subtitle={transformation.subTitle} />

            <section className='mt-10' >
                <TransformationForm action='Add' data={null} userId={user._id} type={transformation.type as TransformationTypeKey}
                    creditBalance={user.credits}

                />
            </section>
        </>
    )
}

export default AddTransformationPage