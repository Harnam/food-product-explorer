export default async function ProductPage({ params }: { params: Promise<{ barcode: string }> }) {
    const { barcode } = await params
    return (
        <>
            Product page for barcode: {barcode}
        </>
    );
}